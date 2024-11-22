package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.model.Topic;
import com.tine.learnTineLearn.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    @Autowired
    public TopicService (TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public ArrayList<Topic> getTopicsByCourseId(Long courseId){
        //Get topics from db
        return new ArrayList<>(topicRepository.findByCourseId(courseId));
    }

    public Topic addNewTopic(Topic topic){
        return topicRepository.save(topic);
    }
}
