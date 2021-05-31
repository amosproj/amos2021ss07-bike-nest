package com.bikenest.servicebikenest.db;

import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.services.BikenestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private BikenestService bikenestService;

    @Autowired
    public DataLoader(BikenestService bikenestService) {
        this.bikenestService = bikenestService;
        this.LoadData();
    }

    public void LoadData() {
        if(bikenestService.getAllBikenests().size() == 0){
            // Add the Bikenest with the service method, so that the Bikespots are correctly created.
            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Hbf Süd 1", "49.444081807031665, 11.082422685617997",
                    13, true));

            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Hbf Süd 2", "49.44408428763211, 11.0826287061008",
                            8, true));

            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Hbf Nord 1", "49.446344470022375, 11.0810884309534938",
                            13, false));

            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Hbf Nord 2", "49.44640223259086, 11.081398793547217",
                            5, true));


/*          TODO: Readd this (i changed the code for the bikenest and all of these would have had to be changed)
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





            Bikenest bikenest_city_maxtorgraben_1 = new Bikenest();
            bikenest_city_maxtorgraben_1.setName("Nürnberg Maxtorgraben 1");
            bikenest_city_maxtorgraben_1.setGpsCoordinates("49.45869585234945, 11.082193685521423");
            bikenest_city_maxtorgraben_1.setSpotsLeft(12);
            bikenestRepository.save(bikenest_city_maxtorgraben_1);

            Bikenest bikenest_city_west_1 = new Bikenest();
            bikenest_city_west_1.setName("Nürnberg City West 1");
            bikenest_city_west_1.setGpsCoordinates("49.45467285989429, 11.071750774413102");
            bikenest_city_west_1.setSpotsLeft(5);
            bikenestRepository.save(bikenest_city_west_1);

            Bikenest bikenest_city_sued_west_1 = new Bikenest();
            bikenest_city_sued_west_1.setName("Nürnberg City Süd-West 1");
            bikenest_city_sued_west_1.setGpsCoordinates("49.44854427092466, 11.067177142544205");
            bikenest_city_sued_west_1.setSpotsLeft(6);
            bikenestRepository.save(bikenest_city_sued_west_1);

            Bikenest bikenest_city_sued_1 = new Bikenest();
            bikenest_city_sued_1.setName("Nürnberg City Süd 1");
            bikenest_city_sued_1.setGpsCoordinates("49.447305385758625, 11.07725993361381");
            bikenest_city_sued_1.setSpotsLeft(2);
            bikenestRepository.save(bikenest_city_sued_1);

            Bikenest bikenest_city_mitte_1 = new Bikenest();
            bikenest_city_mitte_1.setName("Nürnberg Mitte 1");
            bikenest_city_mitte_1.setGpsCoordinates("49.45081093004526, 11.077789322227815");
            bikenest_city_mitte_1.setSpotsLeft(2);
            bikenestRepository.save(bikenest_city_mitte_1);

            Bikenest bikenest_city_mitte_2 = new Bikenest();
            bikenest_city_mitte_2.setName("Nürnberg Mitte 2");
            bikenest_city_mitte_2.setGpsCoordinates("49.453757122653684, 11.077987415588767");
            bikenest_city_mitte_2.setSpotsLeft(4);
            bikenestRepository.save(bikenest_city_mitte_2);

            Bikenest bikenest_city_mitte_3 = new Bikenest();
            bikenest_city_mitte_3.setName("Nürnberg Mitte 3");
            bikenest_city_mitte_3.setGpsCoordinates("49.452655579801416, 11.083743299722743");
            bikenest_city_mitte_3.setSpotsLeft(10);
            bikenestRepository.save(bikenest_city_mitte_3);

            Bikenest bikenest_city_mitte_4 = new Bikenest();
            bikenest_city_mitte_4.setName("Nürnberg Mitte 4");
            bikenest_city_mitte_4.setGpsCoordinates("49.45626501029278, 11.083730093987139");
            bikenest_city_mitte_4.setSpotsLeft(5);
            bikenestRepository.save(bikenest_city_mitte_4);

            Bikenest bikenest_city_mitte_5 = new Bikenest();
            bikenest_city_mitte_5.setName("Nürnberg Mitte 5");
            bikenest_city_mitte_5.setGpsCoordinates("49.45744601348604, 11.07707533380166");
            bikenest_city_mitte_5.setSpotsLeft(18);
            bikenestRepository.save(bikenest_city_mitte_5);

            Bikenest bikenest_city_mitte_6 = new Bikenest();
            bikenest_city_mitte_6.setName("Nürnberg Mitte 6");
            bikenest_city_mitte_6.setGpsCoordinates("49.454068065858024, 11.073297483325339");
            bikenest_city_mitte_6.setSpotsLeft(5);
            bikenestRepository.save(bikenest_city_mitte_6);

            Bikenest bikenest_city_mitte_7 = new Bikenest();
            bikenest_city_mitte_7.setName("Nürnberg Mitte 7");
            bikenest_city_mitte_7.setGpsCoordinates("49.451060570239534, 11.069938992430295");
            bikenest_city_mitte_7.setSpotsLeft(5);
            bikenestRepository.save(bikenest_city_mitte_7);

            Bikenest bikenest_city_mitte_8 = new Bikenest();
            bikenest_city_mitte_8.setName("Nürnberg Mitte 8");
            bikenest_city_mitte_8.setGpsCoordinates("49.44937933061903, 11.072059023828933");
            bikenest_city_mitte_8.setSpotsLeft(5);
            bikenestRepository.save(bikenest_city_mitte_8);

            Bikenest bikenest_dutzendteich_1 = new Bikenest();
            bikenest_dutzendteich_1.setName("Nürnberg Dutzendteich 1");
            bikenest_dutzendteich_1.setGpsCoordinates("49.42785888604916, 11.10626744663648");
            bikenest_dutzendteich_1.setSpotsLeft(15);
            bikenestRepository.save(bikenest_dutzendteich_1);

            Bikenest bikenest_maxfeld_1 = new Bikenest();
            bikenest_maxfeld_1.setName("Nürnberg Maxfeld 1");
            bikenest_maxfeld_1.setGpsCoordinates("49.466134986292765, 11.088486236822144");
            bikenest_maxfeld_1.setSpotsLeft(13);
            bikenestRepository.save(bikenest_maxfeld_1);
             */
        }
    }
}
