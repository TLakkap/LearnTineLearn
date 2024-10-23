package com.tine.learnTineLearn;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.tine.learnTineLearn.controller.SpringController;
import com.tine.learnTineLearn.model.Info;
import com.tine.learnTineLearn.repository.InfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class SpringTest {

    @Mock
    private InfoRepository infoRepository;

    @InjectMocks
    private SpringController spring;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenNoInfosInDb_thenNullIsReturned() {
        when(infoRepository.findAll()).thenReturn(new ArrayList<>());

        Info result = spring.sendInfo(0L);

        assertEquals(null, result);
    }

    @Test
    void whenInfosInDb_thenOneInfoIsReturned() {
        // Create test infos
        Info info1 = new Info(0L, "Info 1");
        Info info2 = new Info(0L, "Info 2");
        List<Info> infos = Arrays.asList(info1, info2);

        // Mock what db returns
        when(infoRepository.findAll()).thenReturn(infos);

        // Mock random
        Random randomMock = mock(Random.class);
        when(randomMock.nextInt(anyInt())).thenReturn(0); // Return first element from list

        Info result = spring.sendInfo(0L);

        assertEquals(info1.getInfo(), result.getInfo());
    }
}

