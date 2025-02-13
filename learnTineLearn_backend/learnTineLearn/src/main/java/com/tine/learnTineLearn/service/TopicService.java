package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.model.Topic;
import com.tine.learnTineLearn.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    @Autowired
    public TopicService (TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getTopicsByCourseId(Long courseId) {
        //Get topics from db, in alphabetical order
        return topicRepository.findByCourseIdOrderByNameAsc(courseId);
    }

    public Topic addNewTopic(Topic topic){
        return topicRepository.save(topic);
    }

    public boolean deleteTopicById(Long id) {
        if (topicRepository.existsById(id)) {  // Check if topic exists in db
            topicRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
