package com.appchat.exception.email;

public class NewEmailEqualToOldException extends RuntimeException {

    public NewEmailEqualToOldException(String email) {
        super("Old and new email are the same value: " + email);
    }

}
