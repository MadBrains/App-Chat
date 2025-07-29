package com.appchat.service.ban;

import com.appchat.dto.ban.BanDTO;
import com.appchat.entity.ban.Ban;
import com.appchat.entity.user.User;
import com.appchat.exception.ban.BanNotFoundException;
import com.appchat.exception.ban.CantBanUserIfHeLastAdminInChatsException;
import com.appchat.repository.ban.BanRepository;
import com.appchat.service.chat.ChatService;
import com.appchat.service.user.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BanServiceImpl implements BanService {

    private final BanRepository banRepository;

    private final BanMapper banMapper;

    private final UserService userService;

    private final ChatService chatService;

    public void createBan(BanDTO banDTO) {
        Ban ban = new Ban();
        banMapper.updateBanFromDTO(banDTO, ban);
        banRepository.save(ban);
    }

    @Override
    public List<Ban> findAllBan(Pageable pageable) {
        return banRepository.findAll(pageable).toList();
    }

    public Ban findById(long banId) {
        return banRepository.findById(banId).orElseThrow(BanNotFoundException::new);
    }

    @Override
    public void banUser(int userId) {
        List<Long> chatIds = chatService.findAllChatIdWhereUserIsLastAdmin(userId);
        if (chatIds.isEmpty()) {
            User user = userService.findUserById(userId);
            user.setBanned(true);
            userService.save(user);
        } else {
            throw new CantBanUserIfHeLastAdminInChatsException(chatIds);
        }
    }

    @Override
    public void unbanUser(int userId) {
        User user = userService.findUserById(userId);
        user.setBanned(false);
        userService.save(user);
    }

}
