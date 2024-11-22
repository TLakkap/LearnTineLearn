package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Topic;
import com.tine.learnTineLearn.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/courses/{courseId}/topics")
public class TopicController {

    private final CustomLogger customLogger;
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService){
        this.customLogger = new CustomLogger();
        this.topicService = topicService;
    }

    @GetMapping
    public ArrayList<Topic> getAllTopicsForCourse(@PathVariable Long courseId) {
        customLogger.debug("Get all topics for course:{}", courseId);

        return topicService.getTopicsByCourseId(courseId);
    }

    @PostMapping("/new")
    public ResponseEntity<Topic> handleData(@PathVariable Long courseId, @RequestBody TopicDTO topic) {
        customLogger.debug("Saving new topic {} for course {}", topic.getName(), courseId);

        Topic newTopic = new Topic(courseId, topic.getName());

        Topic savedTopic = topicService.addNewTopic(newTopic);

        return new ResponseEntity<>(savedTopic, HttpStatus.CREATED);
    }

    public static class TopicDTO{
        String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

    }
}
