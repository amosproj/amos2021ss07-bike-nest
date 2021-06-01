package com.bikenest.servicebikenest.DB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private BikenestRepository bikenestRepository;

    @Autowired
    public DataLoader(BikenestRepository bikenestRepository) {
        this.bikenestRepository = bikenestRepository;
        this.LoadData();
    }

    public void LoadData() {
        if(bikenestRepository.count() == 0){
            Bikenest bikenest_hbf_1 = new Bikenest("Nürnberg Hbf Süd 1",
                    "49.444081807031665, 11.082422685617997", 13, true);
            bikenestRepository.save(bikenest_hbf_1);

            Bikenest bikenest_hbf_2 = new Bikenest("Nürnberg Hbf Süd 2",
                    "49.44408428763211, 11.0826287061008", 8, true);
            bikenestRepository.save(bikenest_hbf_2);

            Bikenest bikenest_hbf_3 = new Bikenest("Nürnberg Hbf Nord 1",
                    "49.446344470022375, 11.0810884309534938", 13, false);
            bikenestRepository.save(bikenest_hbf_3);

            Bikenest bikenest_hbf_4 = new Bikenest("Nürnberg Hbf Nord 2", "49.44640223259086, 11.081398793547217", 5,
                    true);
            bikenestRepository.save(bikenest_hbf_4);

            Bikenest bikenest_wiese_1 = new Bikenest("Nürnberg Wöhrder Wiese 1", "49.45050866440126, 11.087981724233893", 6,
                    true);
            bikenestRepository.save(bikenest_wiese_1);

            Bikenest bikenest_wiese_2 = new Bikenest("Nürnberg Wöhrder Wiese 2", "49.45050880304194, 11.096809867248464", 11,
                    false);
            bikenestRepository.save(bikenest_wiese_2);

            Bikenest bikenest_city_ost_1 = new Bikenest("Nürnberg City Ost 1", "49.451450404306044, 11.084239724558445", 4,
                    true);
            bikenestRepository.save(bikenest_city_ost_1);

            Bikenest bikenest_city_nord_ost_1 = new Bikenest("Nürnberg City Nord-Ost 1", "49.4574806375321, 11.088425465956352", 18,
                    true);
            bikenestRepository.save(bikenest_city_nord_ost_1);

            Bikenest bikenest_gostenhof_1 = new Bikenest("Nürnberg Gostenhof", "49.45079358635928, 11.055413715917615", 1,
                    false);
            bikenestRepository.save(bikenest_gostenhof_1);

            Bikenest bikenest_city_maxtorgraben_1 = new Bikenest("Nürnberg Maxtorgraben 1", "49.45869585234945, 11.082193685521423", 12, 
                    true);
            bikenestRepository.save(bikenest_city_maxtorgraben_1);   

            Bikenest bikenest_city_west_1 = new Bikenest("Nürnberg City West 1", "49.45467285989429, 11.071750774413102", 5, 
                    false);
            bikenestRepository.save(bikenest_city_west_1);

            Bikenest bikenest_city_sued_west_1 = new Bikenest("Nürnberg City Süd-West 1", "49.44854427092466, 11.067177142544205", 6,
                     true);
            bikenestRepository.save(bikenest_city_sued_west_1);

            Bikenest bikenest_city_sued_1 = new Bikenest("Nürnberg City Süd 1",  "49.447305385758625, 11.07725993361381", 2,
                    true);
            bikenestRepository.save(bikenest_city_sued_1);

            Bikenest bikenest_city_mitte_1 = new Bikenest("Nürnberg Mitte 1", "49.45081093004526, 11.077789322227815", 2, 
                    true);
            bikenestRepository.save(bikenest_city_mitte_1);

            Bikenest bikenest_city_mitte_2 = new Bikenest("Nürnberg Mitte 2", "49.453757122653684, 11.077987415588767", 4, 
                    true);
            bikenestRepository.save(bikenest_city_mitte_2);

            Bikenest bikenest_city_mitte_3 = new Bikenest("Nürnberg Mitte 3", "49.452655579801416, 11.083743299722743", 10, 
                    true);
            bikenestRepository.save(bikenest_city_mitte_3);

            Bikenest bikenest_city_mitte_4 = new Bikenest("Nürnberg Mitte 4", "49.45626501029278, 11.083730093987139", 5,
                    true);
            bikenestRepository.save(bikenest_city_mitte_4);

            Bikenest bikenest_city_mitte_5 = new Bikenest("Nürnberg Mitte 5", "49.45744601348604, 11.07707533380166", 18, 
                    false);
            bikenestRepository.save(bikenest_city_mitte_5);

            Bikenest bikenest_city_mitte_6 = new Bikenest("Nürnberg Mitte 6", "49.454068065858024, 11.073297483325339", 5, 
                    false);
            bikenestRepository.save(bikenest_city_mitte_6);

            Bikenest bikenest_city_mitte_7 = new Bikenest("Nürnberg Mitte 7", "49.451060570239534, 11.069938992430295", 5,
                    true);
            bikenestRepository.save(bikenest_city_mitte_7);

            Bikenest bikenest_city_mitte_8 = new Bikenest("Nürnberg Mitte 8", "49.44937933061903, 11.072059023828933", 5, 
                    true);
            bikenestRepository.save(bikenest_city_mitte_8);

            Bikenest bikenest_dutzendteich_1 = new Bikenest("Nürnberg Dutzendteich 1", "49.42785888604916, 11.10626744663648", 15,
                    true);
            bikenestRepository.save(bikenest_dutzendteich_1);

            Bikenest bikenest_maxfeld_1 = new Bikenest("Nürnberg Maxfeld 1", "49.466134986292765, 11.088486236822144", 13,
                    true);
            bikenestRepository.save(bikenest_maxfeld_1);
        }
    }
}
