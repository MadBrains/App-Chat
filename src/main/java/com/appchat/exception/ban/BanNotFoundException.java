package com.appchat.exception.ban;

public class BanNotFoundException extends RuntimeException {

    public BanNotFoundException() {
        super("Ban not found");
    }

}
