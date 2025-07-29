package com.appchat.repository.chat;

import com.appchat.entity.chat.Chat;
import jakarta.persistence.Tuple;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    //Query with sub select maybe effectively but sub select doesn't allow in jpa
    //SELECT c.*, cm.*, w.first_name, w.last_name, m.body
    //FROM chat c
    //         LEFT JOIN (SELECT m.chat_id ci, MAX(id) max_id
    //                     FROM message m
    //                     GROUP BY ci) sub ON c.id = sub.ci
    //         LEFT JOIN message m ON sub.max_id = m.id
    //         INNER JOIN chat_member cm ON c.id = cm.chat_id
    //         LEFT JOIN user u ON u.id = m.user_id
    //WHERE NOT c.is_deleted AND cm.user_id = :userId;

    @Query(value = "select c, cm, u.firstName, u.lastName, m.body " +
                           "from Chat c " +
                           "          left join Message m on m.chatId.id = c.id " +
                           "          inner join ChatMember cm on c.id = cm.chatId.id " +
                           "          left join User u on u.id = m.userId.id " +
                           "where not c.deleted " +
                           "  and cm.userId.id = :userId " +
                           "  and (m.id = (select max(m2.id) " +
                           "               from Message m2 where c.id = m2.chatId.id" +
                           "               group by  m2.chatId) or m.id is null)")
    List<Tuple> findAllChatsWithMemberInfo(@Param("userId") int id, Pageable pageable);

    @Query("select c from Chat as c " +
                   "         inner join ChatType ct on ct.id = c.chatTypeId.id " +
                   "         inner join ChatMember cm on c.id = cm.chatId.id " +
                   "where not c.deleted " +
                   "  and ct.chatTypeName = 'PRIVATE' " +
                   "  and (cm.userId.id = :first_user or cm.userId.id = :second_user) " +
                   "group by c.id " +
                   "having count(*) > 1")
    Optional<Chat> findPrivateChatIfExist(@Param("first_user") int firstUser,
            @Param("second_user") int secondUser);

    @Query("select c from Chat as c " +
                   "         inner join ChatType ct on ct.id = c.chatTypeId.id " +
                   "         inner join ChatMember cm on c.id = cm.chatId.id " +
                   "where not c.deleted and ct.chatTypeName = 'PRIVATE' " +
                   "group by c.id, c.chatOwner.id " +
                   "having count(*) = 1 and c.chatOwner.id = :user_id")
    Optional<Chat> findPrivateChatWithYourself(@Param("user_id") int userId);


    @Query("select c from Chat c where c.deleted")
    List<Chat> findAllDeletedChats(Pageable pageable);

    @Modifying
    @Query("update Chat set deleted = false " +
                   "where id in :chatIds")
    void restoreDeletedChatsById(@Param("chatIds") List<Long> chatIds);

    @Query("select cm.chatId.id from ChatMember cm " +
                   "               inner join Chat c on cm.chatId.id = c.id " +
                   "               inner join ChatType ct on c.chatTypeId.id = ct.id " +
                   "               where cm.userId.id =:userId and cm.isAdmin and ct.chatTypeName = 'GROUP_CHAT' "
                   +
                   "group by cm.chatId.id having count(cm.isAdmin) = 1")
    List<Long> findAllChatIdWhereUserIsLastAdmin(@Param("userId") long userId);

}
