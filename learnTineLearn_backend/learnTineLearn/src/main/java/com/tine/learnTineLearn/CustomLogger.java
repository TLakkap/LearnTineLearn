package com.tine.learnTineLearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class that is responsible for logging functions
 */

/**
 * Class for handling structured and consistent logging across the application.
 * Wraps SLF4J Logger to provide convenience methods for logging at different
 * levels (INFO, DEBUG, ERROR) with optional argument formatting.
 */
public class CustomLogger {

    private static final Logger logger = LoggerFactory.getLogger(CustomLogger.class);

    /**
     * Logs an informational message.
     *
     * @param message the message to log
     */
    public void info(String message) {
        logger.info(message);
    }

    /**
     * Logs a debug message.
     *
     * @param message the message to log
     */
    public void debug(String message) {
        logger.debug(message);
    }

    /**
     * Logs a debug message with optional arguments for formatting.
     *
     * This method supports SLF4J-style placeholders (e.g., "{}") for argument
     * substitution, enabling better performance by deferring string concatenation
     * until logging is actually performed.
     *
     * @param message the message template with placeholders
     * @param args the arguments to substitute into the placeholders
     * @example debug("Fetching data for user: {}", userId);
     */
    public void debug(String message, Object... args) {
        logger.debug(message, args);
    }

    /**
     * Logs an error message.
     *
     * @param message the error message to log
     */
    public void error(String message) {
        logger.error(message);
    }
}
