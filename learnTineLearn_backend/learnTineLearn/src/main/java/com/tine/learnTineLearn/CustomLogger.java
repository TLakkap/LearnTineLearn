package com.tine.learnTineLearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomLogger {
    private static final Logger logger = LoggerFactory.getLogger(CustomLogger.class);

    public void info(String message) {
        logger.info(message);
    }

    public void debug(String message) {
        logger.debug(message);
    }

    public void debug(String message, Object... args) {
        logger.debug(message, args);
    }

    public void error(String message) {
        logger.error(message);
    }
}
