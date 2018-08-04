package com.pl.myapp.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public @ResponseBody List<String> welcome() {
        List<String> array = Arrays.asList("Ala", "ma", "kota");
        return array;
    }
}