package com.appchat.repository;

import com.appchat.entity.message.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = "select * from Message m " +
                           "where m.chat_id = :chatId and " +
                           "case " +
                           "when (not :cursor = 0) then m.id < :cursor " +
                           "else true " +
                           "end " +
                           "order by m.id desc " +
                           "limit :limit", nativeQuery = true)
    List<Message> cursorFindMessages(@Param("chatId") long chatId,
            @Param("limit") long limit,
            @Param("cursor") long cursor);

}
