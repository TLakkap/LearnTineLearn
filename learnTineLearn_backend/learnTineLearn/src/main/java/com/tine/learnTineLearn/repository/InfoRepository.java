package com.tine.learnTineLearn.repository;

import com.tine.learnTineLearn.model.Info;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoRepository extends CrudRepository<Info, Long> {
}

