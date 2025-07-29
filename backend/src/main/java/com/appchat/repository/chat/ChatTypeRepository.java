package com.appchat.repository.chat;

import com.appchat.entity.chat.ChatType;
import com.appchat.entity.chat.enums.ChatTypeName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatTypeRepository extends JpaRepository<ChatType, Long> {

    Optional<ChatType> findByChatTypeName(ChatTypeName chatTypeName);

}
