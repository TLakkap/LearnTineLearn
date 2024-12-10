package com.tine.learnTineLearn.controller;

import com.tine.learnTineLearn.CustomLogger;
import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.service.InfoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/courses/{courseId}/topics/{topicId}")
public class InfoController {

    private final CustomLogger customLogger;
    private final InfoService infoService;

    @Autowired
    public InfoController(InfoService infoService) {
        this.customLogger = new CustomLogger();
        this.infoService = infoService;
    }

    @GetMapping
    public ResponseEntity<Info> sendInfo(@PathVariable("topicId") Long topicId) {
        ArrayList<Info> infos = infoService.getInfosByTopicId(topicId);

        if (infos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        for (Info info : infos) {
            customLogger.debug(info.getInfo());
        }

        Info info = infoService.getRandomInfoFromList(infos);

        return ResponseEntity.ok(info);
    }

    @PostMapping
    public ResponseEntity<Info> handleData(@PathVariable Long topicId, @RequestBody Info info) {
        // Make sure path topic id and info topic id are the same
        if (!topicId.equals(info.getTopicId())) {
            return ResponseEntity.badRequest().build();
        }

        customLogger.info("Received new info: " + info.getInfo());

        Info savedInfo = infoService.addNewInfo(info);

        return new ResponseEntity<>(savedInfo, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", produces = "application/json")
    public ResponseEntity<Info> update(@PathVariable("id") Long id, @RequestBody Info info){
        // Make sure path id and info id are the same
        if (!id.equals(info.getId())) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Info updatedInfo = infoService.updateInfo(info);
            return new ResponseEntity<>(updatedInfo, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            customLogger.error("Info not found when trying to update it: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            customLogger.error("Caught exception when trying to update info: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteData(@PathVariable("id") Long id) {
        try {
            infoService.deleteInfo(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            customLogger.error("Info not found when trying to delete it: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            customLogger.error("Caught exception when trying to delete info: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

}
