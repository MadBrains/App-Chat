package com.appchat.service.ban;

import com.appchat.dto.ban.BanDTO;
import com.appchat.entity.ban.Ban;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BanMapper {

    @Mapping(target = "id", ignore = true)
    void updateBanFromDTO(BanDTO banDTO, @MappingTarget Ban ban);

    BanDTO dtoFromEntity(Ban ban);

}
