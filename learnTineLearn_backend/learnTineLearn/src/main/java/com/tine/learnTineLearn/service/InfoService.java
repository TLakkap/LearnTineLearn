package com.tine.learnTineLearn.service;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.repository.InfoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class InfoService {

    private final CustomLogger customLogger;
    private final InfoRepository infoRepository;

    @Autowired
    public InfoService(InfoRepository infoRepository) {
        this.customLogger = new CustomLogger();
        this.infoRepository = infoRepository;
    }

    public ArrayList<Info> getAllInfos() {
        ArrayList<Info> allInfos = new ArrayList<>();
        //Get all infos from db
        infoRepository.findAll().forEach(allInfos::add);

        return allInfos;
    }

    public ArrayList<Info> getInfosByTopicId(Long topicId) {
        return infoRepository.findByTopicId(topicId);
    }

    public Info getRandomInfoFromList(ArrayList<Info> infoList) {
        Random random = new Random();
        Info info = infoList.get(random.nextInt(infoList.size()));
        customLogger.debug("Got random info: {}, with id: {}", info.getInfo(), info.getId().toString());
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
        if(existingInfo.isEmpty()) {
            throw new EntityNotFoundException("Info with id " + id + " not found.");
        }

        infoRepository.delete(existingInfo.get());
    }

}
