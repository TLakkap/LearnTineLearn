package com.tine.learnTineLearn;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;

import com.tine.learnTineLearn.controller.InfoController;
import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.service.InfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

class InfoTest {

    @Mock
    private InfoService infoService;

    @InjectMocks
    private InfoController infoController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenNoInfosInDb_thenNullIsReturned() {
        Long courseId = 0L;
        when(infoService.getInfosByCourseId(courseId)).thenReturn(new ArrayList<>());

        ResponseEntity<Info> response = infoController.sendInfo(courseId);

        assertEquals(ResponseEntity.notFound().build(), response);
        verify(infoService, times(1)).getInfosByCourseId(courseId);
    }

    @Test
    void whenInfosInDb_thenOneInfoIsReturned() {
        // Create test infos
        Long courseId = 0L;
        Info mockInfo = new Info(courseId, "Info 1");
        ArrayList<Info> infos = new ArrayList<>();
        infos.add(mockInfo);

        when(infoService.getInfosByCourseId(courseId)).thenReturn(infos);
        when(infoService.getRandomInfoFromList(infos)).thenReturn(mockInfo);

        ResponseEntity<Info> response = infoController.sendInfo(courseId);

        assertEquals(ResponseEntity.ok(mockInfo), response);
        verify(infoService, times(1)).getInfosByCourseId(courseId);
        verify(infoService, times(1)).getRandomInfoFromList(infos);
    }
}

