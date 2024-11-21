package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Info;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface InfoRepository extends CrudRepository<Info, Long> {
    ArrayList<Info> findByCourseId(Long courseId);
}

