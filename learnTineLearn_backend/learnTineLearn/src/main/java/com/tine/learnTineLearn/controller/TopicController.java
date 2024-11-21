package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Topic;
import com.tine.learnTineLearn.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/course/{courseId}/topics")
public class TopicController {

    private final CustomLogger customLogger;
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService){
        this.customLogger = new CustomLogger();
        this.topicService = topicService;
    }

    @GetMapping
    public ArrayList<Topic> getAllTopics() {
        customLogger.debug("Get all topics");

        return topicService.getTopics();
    }
}
