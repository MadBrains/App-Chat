package com.appchat.repository.user;

import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Password;
import com.appchat.entity.user.enums.InviteAttributeValues;
import jakarta.persistence.Tuple;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select ps from Password ps " +
                   "join fetch ps.user " +
                   "where ps.user.id = :id and ps.isActual = true")
    Optional<Password> findActualPasswordByUser(Integer id);

    @Query("select u, r.roleName from User u " +
                   "inner join UserRole ur on ur.user.id = u.id " +
                   "inner join Role r on r.id = ur.role.id " +
                   "where u.enabled = true and u.deleted = false")
    List<Tuple> findAllUsers(Pageable pageable);

    @Query("select u, r.roleName from User u " +
                   "inner join UserRole ur on ur.user.id = u.id " +
                   "inner join Role r on r.id = ur.role.id " +
                   "where u.enabled = true and u.deleted = false " +
                   "   and (concat(u.firstName, ' ', u.lastName, ' ', u.middleName) ilike %:text% "
                   +
                   "   or concat(u.firstName, ' ', u.middleName, ' ', u.lastName) ilike %:text% " +
                   "   or concat(u.lastName, ' ', u.firstName, ' ', u.middleName) ilike %:text% " +
                   "   or concat(u.lastName, ' ', u.middleName, ' ', u.firstName) ilike %:text% " +
                   "   or concat(u.middleName, ' ', u.lastName, ' ', u.firstName) ilike %:text% " +
                   "   or concat(u.middleName, ' ', u.firstName, ' ', u.lastName) ilike %:text%) ")
    List<Tuple> searchUsersByFirstNameAndLastName(@Param("text") String text,
            Pageable pageable);

    @Query("select u, l.methodValue from User u " +
                   "inner join Login l on l.user.id = u.id " +
                   "where u.id = :id and l.method = :method_value")
    Tuple findUserWithMethodValue(@Param("id") int id,
            @Param("method_value") InviteAttributeValues methodValue);

}
