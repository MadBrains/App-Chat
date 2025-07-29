package com.appchat.repository.chat;

import com.appchat.entity.chat.ChatMember;
import jakarta.persistence.Tuple;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {

    @Query("select cm from ChatMember cm " +
                   "where cm.chatId.id = :chatId and cm.userId.id = :userId")
    Optional<ChatMember> findChatMemberByChatIdAndUserId(@NotNull Long chatId,
            @NotNull Integer userId);

    @Query("select cm, u.firstName, u.lastName, u.avatarUrl from ChatMember cm " +
                   "inner join User u on u.id = cm.userId.id " +
                   "where cm.chatId.id = :chatId")
    List<Tuple> findChatMemberByChatId(@Param("chatId") Long id, Pageable pageable);

    @Query("select cm.userId.id from ChatMember cm " +
                   "where cm.chatId.id = :chatId")
    Set<Integer> findAllMemberIdInChat(@Param("chatId") long chatId);

    @Query("select cm from ChatMember cm " +
                   "where cm.chatId.id = :chatId and cm.isAdmin")
    List<ChatMember> findAllAdminsInChat(@Param("chatId") long chatId);

}
