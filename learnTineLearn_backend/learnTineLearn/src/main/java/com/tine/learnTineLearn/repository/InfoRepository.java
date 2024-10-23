package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Info;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InfoRepository extends CrudRepository<Info, Long> {
    List<Info> findByCourseId(Long courseId);
}

