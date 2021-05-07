package com.bikenest.servicebikenest;

import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller // This means that this class is a Controller
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class BikenestController {
    @Autowired // Automatically get the bikenestRepository Bean
    private BikenestRepository bikenestRepository;

    //Post Annotation to make this path accept HTTP POST
    //Request Param to specify that Name and SpotsLeft are POST parameters
    //ResponseBody to specify that the returned String is a response
    @PostMapping(path="/add")
    public @ResponseBody
    String AddNewBikenest (@RequestParam String Name
            , @RequestParam Integer SpotsLeft) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Bikenest bikenest = new Bikenest();
        bikenest.SetName(Name);
        bikenest.SetSpotsLeft(SpotsLeft);

        bikenestRepository.save(bikenest);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Bikenest> GetAllBikenests() {
        return bikenestRepository.findAll();
    }
}
