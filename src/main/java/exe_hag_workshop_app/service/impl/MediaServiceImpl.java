package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.MediaDTO;
import exe_hag_workshop_app.entity.Media;
import exe_hag_workshop_app.entity.Workshops;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.repository.MediaRepository;
import exe_hag_workshop_app.repository.WorkshopRepository;
import exe_hag_workshop_app.service.MediaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MediaServiceImpl implements MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    @Override
    public MediaDTO createMedia(MediaDTO mediaDTO) {
        Workshops workshop = workshopRepository.findById(mediaDTO.getWorkshopId()).orElseThrow(() -> new ResourceNotFoundException("Workshop not found with id: " + mediaDTO.getWorkshopId()));
        Media media = new Media();
        BeanUtils.copyProperties(mediaDTO, media);
        media.setWorkshop(workshop);
        mediaRepository.save(media);
        return mediaDTO;
    }

    @Override
    public MediaDTO updateMedia(Integer mediaId, MediaDTO mediaDTO) {
        Media existingMedia = mediaRepository.findById(mediaId).orElseThrow(() -> new ResourceNotFoundException("Media not found with id: " + mediaId));
        BeanUtils.copyProperties(mediaDTO, existingMedia);
        mediaRepository.save(existingMedia);
        return mediaDTO;
    }

    @Override
    public void deleteMedia(Integer mediaId) {
        Media media = mediaRepository.findById(mediaId).orElseThrow(() -> new ResourceNotFoundException("Media not found with id: " + mediaId));
        mediaRepository.delete(media);
    }

    @Override
    public MediaDTO getMediaById(Integer mediaId) {
        Media media = mediaRepository.findById(mediaId).orElseThrow(() -> new ResourceNotFoundException("Media not found with id: " + mediaId));
        MediaDTO mediaDTO = new MediaDTO();
        BeanUtils.copyProperties(media, mediaDTO);
        return mediaDTO;
    }


} 