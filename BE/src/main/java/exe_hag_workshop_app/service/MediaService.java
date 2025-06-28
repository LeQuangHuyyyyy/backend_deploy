package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.MediaDTO;
import exe_hag_workshop_app.entity.Media;

import java.util.List;

public interface MediaService {

    List<MediaDTO> getAllMedia();

    MediaDTO createMedia(MediaDTO mediaDTO);

    MediaDTO updateMedia(Integer mediaId, MediaDTO mediaDTO);

    void deleteMedia(Integer mediaId);

    MediaDTO getMediaById(Integer mediaId);

}