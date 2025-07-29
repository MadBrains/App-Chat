package com.appchat.config.socket;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.appchat.auth.jwt.JWTUtils;
import com.appchat.entity.user.User;
import com.appchat.exception.message.SocketConnectException;
import com.appchat.exception.message.SocketSubscribeException;
import com.appchat.service.chat.ChatMemberService;
import com.appchat.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
@AllArgsConstructor
public class MessageInterceptor implements ChannelInterceptor {

    private final JWTUtils jwtUtils;

    private final ChatMemberService chatMemberService;

    private final UserService userService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null) {
            if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                checkConnect(accessor);
            }
            if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
                checkSubscribe(accessor);
            }
        }
        return message;
    }

    private void checkConnect(StompHeaderAccessor accessor) {
        if (accessor.containsNativeHeader(AUTHORIZATION)) {
            String token = accessor.getNativeHeader(AUTHORIZATION).get(0);
            AdviceWebSocketPrincipal user =
                    jwtUtils.getAdviceWebSocketPrincipal(token.replace("Bearer ", ""));
            accessor.setUser(user);
        } else {
            throw new SocketConnectException();
        }
    }

    private void checkSubscribe(StompHeaderAccessor accessor) {
        if (accessor.getUser() != null && accessor.getDestination() != null) {
            User user = userService.findUserById(Integer.parseInt(accessor.getUser().getName()));
            if (!accessor.getDestination().contains("user")) {
                chatMemberService.findChatMemberByChatIdAndUserId(
                        Long.parseLong(ObjectUtils.nullSafeToString(accessor.getDestination())
                                               .replaceAll("(v1\\.0)", "")
                                               .replaceAll("\\D", "")),
                        user.getId());
            }
        } else {
            throw new SocketSubscribeException();
        }
    }

}
