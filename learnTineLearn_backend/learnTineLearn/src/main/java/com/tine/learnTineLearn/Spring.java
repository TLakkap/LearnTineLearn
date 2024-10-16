package com.tine.learnTineLearn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/spring")
public class Spring{

    @Autowired
    InfoRepository infoRepository;

    @GetMapping("/")
    public Info sendInfo() {
        List<Info> infos = new ArrayList<>();
        //Get infos from db
        infoRepository.findAll().forEach(infos::add);

        if (infos.isEmpty()) {
            return new Info("No saved infos");
        }

        for (Info info : infos) {
            System.out.println(info.getInfo());
        }

        //Send random info to UI
        Random random = new Random();
        Info info = infos.get(random.nextInt(infos.size()));
        System.out.println(info.getInfo());
        System.out.println(info.getId());

        return info;
    }

    @PostMapping("/new")
    public ResponseEntity<String> handleData(@RequestBody Info info) {
        System.out.println("Received new info: " + info.getInfo());

        infoRepository.save(info);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteData(@PathVariable("id") Long id) {
        Optional<Info> existingInfo = infoRepository.findById(id);
        if(existingInfo.isPresent()) {
            infoRepository.delete(existingInfo.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public static class DataPayload {
        private String info;

        public String getInfo() {
            return info;
        }

        public void setInfo(String info) {
            this.info = info;
        }
    }

    /*public static class Response {
        private String message;

        public Response(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }*/

}
