package com.bikenest.servicebikenest.db;

import com.bikenest.common.exceptions.BusinessLogicException;
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
    public DataLoader(BikenestService bikenestService) throws BusinessLogicException {
        this.bikenestService = bikenestService;
        this.LoadData();
    }

    public void LoadData() throws BusinessLogicException {
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

            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Wöhrder Wiese 1", "49.45050866440126, 11.087981724233893",
                            6, true));

            bikenestService.addBikenest(
                    new AddBikenestRequest("Nürnberg Wöhrder Wiese 2", "49.45050880304194, 11.096809867248464", 11,
                    false));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg City Ost 1", "49.451450404306044, 11.084239724558445", 4,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg City Nord-Ost 1", "49.4574806375321, 11.088425465956352", 18,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Gostenhof", "49.45079358635928, 11.055413715917615", 1,
                    false));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Maxtorgraben 1", "49.45869585234945, 11.082193685521423", 12,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg City West 1", "49.45467285989429, 11.071750774413102", 5,
                    false));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg City Süd-West 1", "49.44854427092466, 11.067177142544205", 6,
                     true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg City Süd 1",  "49.447305385758625, 11.07725993361381", 2,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 1", "49.45081093004526, 11.077789322227815", 2,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 2", "49.453757122653684, 11.077987415588767", 4,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 3", "49.452655579801416, 11.083743299722743", 10,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 4", "49.45626501029278, 11.083730093987139", 5,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 5", "49.45744601348604, 11.07707533380166", 18,
                    false));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 6", "49.454068065858024, 11.073297483325339", 5,
                    false));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 7", "49.451060570239534, 11.069938992430295", 5,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Mitte 8", "49.44937933061903, 11.072059023828933", 5,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Dutzendteich 1", "49.42785888604916, 11.10626744663648", 15,
                    true));

            bikenestService.addBikenest(new AddBikenestRequest("Nürnberg Maxfeld 1", "49.466134986292765, 11.088486236822144", 13,
                    true));
        }
    }
}
