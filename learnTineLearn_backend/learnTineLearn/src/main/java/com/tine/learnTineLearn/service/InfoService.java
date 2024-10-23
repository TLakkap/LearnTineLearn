package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.repository.InfoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

@Service
public class InfoService {

    private final InfoRepository infoRepository;

    @Autowired
    public InfoService(InfoRepository infoRepository) {
        this.infoRepository = infoRepository;
    }

    public ArrayList getAllInfos() {
        ArrayList<Info> allInfos = new ArrayList<Info>();
        //Get all infos from db
        infoRepository.findAll().forEach(allInfos::add);

        return allInfos;
    }

    public ArrayList getInfosByCourseId(Long courseId) {
        ArrayList<Info> infosInCourse = new ArrayList<Info>();
        //get infos for course from db
        infoRepository.findByCourseId(courseId);

        return infosInCourse;
    }

    public Info getRandomInfoFromList(ArrayList<Info> infoList) {
        Random random = new Random();
        Info info = infoList.get(random.nextInt(infoList.size()));
        System.out.println(info.getInfo());
        System.out.println(info.getId());
        return info;
    }

    public Info addNewInfo(Info info){
        return infoRepository.save(info);
    }

    public Info updateInfo(Info info) {
        Optional<Info> existingInfo = infoRepository.findById(info.getId());

        if (existingInfo.isPresent()) {
            Info updatedInfo = existingInfo.get();

            // Update only if changed
            if (!updatedInfo.getInfo().equals(info.getInfo())) {
                updatedInfo.setInfo(info.getInfo());
                return infoRepository.save(updatedInfo);
            }

            return updatedInfo;
        }

        throw new EntityNotFoundException("Info with id " + info.getId() + " not found.");
    }

    public void deleteInfo(Long id) {
        Optional<Info> existingInfo = infoRepository.findById(id);
        if(!existingInfo.isPresent()) {
            throw new EntityNotFoundException("Info with id " + id + " not found.");
        }

        infoRepository.delete(existingInfo.get());
    }

}
