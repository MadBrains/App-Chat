package com.appchat.exception.role;

public class RoleWithThisNameAlreadyExistException extends RuntimeException {

    public RoleWithThisNameAlreadyExistException(String name) {
        super("Role with this name already exist: " + name);
    }

}
