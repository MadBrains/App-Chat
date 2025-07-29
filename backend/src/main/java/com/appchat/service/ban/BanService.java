package com.appchat.service.ban;

import com.appchat.dto.ban.BanDTO;
import com.appchat.entity.ban.Ban;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface BanService {

    void createBan(BanDTO banDTO);

    List<Ban> findAllBan(Pageable pageable);

    void banUser(int userId);

    void unbanUser(int userId);

}
