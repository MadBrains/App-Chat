package com.appchat.exception.role;

public class RoleNotExistException extends RuntimeException {

    public RoleNotExistException() {
        super("Role not exist");
    }

}
