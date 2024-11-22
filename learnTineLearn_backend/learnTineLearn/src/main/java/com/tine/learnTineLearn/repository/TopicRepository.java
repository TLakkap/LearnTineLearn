package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Topic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TopicRepository extends CrudRepository<Topic, Long> {
    ArrayList<Topic> findByCourseId(Long courseId);
}
