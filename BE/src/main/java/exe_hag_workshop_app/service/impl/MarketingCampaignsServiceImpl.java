package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CategoryWorkshopDTO;
import exe_hag_workshop_app.entity.*;
import exe_hag_workshop_app.entity.Enums.MarketingCampaignType;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.*;
import exe_hag_workshop_app.repository.MarketingCampaignsCategoryRepository;
import exe_hag_workshop_app.repository.MarketingCampaignsRepository;
import exe_hag_workshop_app.repository.MediaRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.MarketingCampaignsService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.ArrayList;

@Service
public class MarketingCampaignsServiceImpl implements MarketingCampaignsService {

    private static final Logger logger = LoggerFactory.getLogger(MarketingCampaignsServiceImpl.class);

    @Autowired
    private MarketingCampaignsRepository marketingCampaignsRepository;

    @Autowired
    private MarketingCampaignsCategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MediaRepository mediaRepository;

    @Override
    @Transactional
    public MarketingCampaignsResponse createMarketingCampaign(MarketingCampaignsRequest request) {
        MarketingCampaignCategory category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        MarketingCampaigns campaign = new MarketingCampaigns();
        BeanUtils.copyProperties(request, campaign);
        campaign.setStatus(MarketingCampaignType.STARTED);
        campaign.setMarketingCampaignCategory(category);
        MarketingCampaigns savedCampaign = marketingCampaignsRepository.save(campaign);
        return convertToResponse(savedCampaign);
    }

    @Override
    @Transactional
    public MarketingCampaignsResponse updateMarketingCampaign(int id, MarketingCampaignsRequest request) {
        MarketingCampaigns campaign = marketingCampaignsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + id));

        MarketingCampaignCategory category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        BeanUtils.copyProperties(request, campaign);
        campaign.setMarketingCampaignCategory(category);

        MarketingCampaigns updatedCampaign = marketingCampaignsRepository.save(campaign);
        return convertToResponse(updatedCampaign);
    }

    @Override
    public void deleteMarketingCampaign(int id) {
        MarketingCampaigns campaign = marketingCampaignsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + id));
        marketingCampaignsRepository.delete(campaign);
    }

    @Override
    public MarketingCampaignsResponse getMarketingCampaignById(int id) {
        MarketingCampaigns campaign = marketingCampaignsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + id));
        return convertToResponse(campaign);
    }

    @Override
    public ResponseData getAllMarketingCampaigns() {
        List<MarketingCampaigns> campaigns = marketingCampaignsRepository.findAll();
        List<MarketingCampaignsResponse> responseList = campaigns.stream().map(this::convertToResponse).collect(Collectors.toList());

        ResponseData responseData = new ResponseData();
        responseData.setStatus(200);
        responseData.setDescription("Success");
        responseData.setData(responseList);
        return responseData;
    }

    @Override
    public ResponseData getMarketingCampaignsByCategory(int categoryId) {
        List<MarketingCampaigns> campaigns = marketingCampaignsRepository.findByMarketingCampaignCategory_CategoryId(categoryId);

        List<MarketingCampaignsResponse> responseList = campaigns.stream().map(this::convertToResponse).collect(Collectors.toList());

        ResponseData responseData = new ResponseData();
        responseData.setStatus(200);
        responseData.setDescription("Success");
        responseData.setData(responseList);
        return responseData;
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseData getWorkshopsByCategories() {
        try {
            List<MarketingCampaignCategory> categories = categoryRepository.findAll();
            logger.info("Found {} categories", categories.size());

            List<CategoryWorkshopDTO> categoryWorkshops = categories.stream().map(category -> {
                try {
                    CategoryWorkshopDTO dto = new CategoryWorkshopDTO();
                    dto.setCategoryId(category.getCategoryId());
                    dto.setCategoryName(category.getCategoryName());

                    // Debug log cho category
                    logger.info("Processing category: {} ({})", category.getCategoryId(), category.getCategoryName());

                    List<MarketingCampaigns> campaigns = marketingCampaignsRepository.findByMarketingCampaignCategory_CategoryId(category.getCategoryId());
                    logger.info("Found {} campaigns for category {}", campaigns.size(), category.getCategoryId());

                    // Debug log cho campaigns
                    for (MarketingCampaigns campaign : campaigns) {
                        logger.info("Campaign: {} ({})", campaign.getCampaignId(), campaign.getCampaignName());
                        Set<WorkshopMarketingCampaign> wmcs = campaign.getWorkshopMarketingCampaigns();
                        if (wmcs != null) {
                            logger.info("Campaign {} has {} workshop marketing campaigns", campaign.getCampaignId(), wmcs.size());
                            for (WorkshopMarketingCampaign wmc : wmcs) {
                                if (wmc.getWorkshop() != null) {
                                    logger.info("Workshop: {} ({})", wmc.getWorkshop().getWorkshopId(), wmc.getWorkshop().getWorkshopTitle());
                                }
                            }
                        }
                    }

                    List<WorkshopResponse> workshops = new ArrayList<>();

                    for (MarketingCampaigns campaign : campaigns) {
                        if (campaign.getWorkshopMarketingCampaigns() != null) {
                            for (WorkshopMarketingCampaign wmc : campaign.getWorkshopMarketingCampaigns()) {
                                if (wmc.getWorkshop() != null) {
                                    Workshops workshop = wmc.getWorkshop();
                                    WorkshopResponse response = new WorkshopResponse();
                                    BeanUtils.copyProperties(workshop, response);

                                    if (workshop.getInstructor() != null) {
                                        response.setCreateBy(workshop.getInstructor().getFirstName() + " " + workshop.getInstructor().getLastName());
                                    }

                                    if (workshop.getSchedules() != null && !workshop.getSchedules().isEmpty()) {
                                        response.setSchedules(workshop.getSchedules().stream().map(schedule -> {
                                            ScheduleRequest scheduleRequest = new ScheduleRequest();
                                            BeanUtils.copyProperties(schedule, scheduleRequest);
                                            return scheduleRequest;
                                        }).collect(Collectors.toSet()));
                                    }

                                    workshops.add(response);
                                    logger.info("Added workshop {} to response", workshop.getWorkshopId());
                                }
                            }
                        }
                    }

                    logger.info("Category {} has {} workshops in final response", category.getCategoryId(), workshops.size());
                    dto.setWorkshops(workshops);
                    return dto;

                } catch (Exception e) {
                    logger.error("Error processing category {}: {}", category.getCategoryId(), e.getMessage(), e);
                    return null;
                }
            }).collect(Collectors.toList());

            ResponseData responseData = new ResponseData();
            responseData.setStatus(200);
            responseData.setDescription("Success");
            responseData.setData(categoryWorkshops);
            return responseData;

        } catch (Exception e) {
            logger.error("Error in getWorkshopsByCategories: {}", e.getMessage(), e);
            ResponseData responseData = new ResponseData();
            responseData.setStatus(500);
            responseData.setDescription("Error: " + e.getMessage());
            responseData.setData(List.of());
            return responseData;
        }
    }

    @Override
    public ResponseData getAllCategories() {
        List<MarketingCampaignCategory> categories = categoryRepository.findAll();
        List<CategoryWorkshopDTO> responseList = categories.stream().map(category -> {
            CategoryWorkshopDTO dto = new CategoryWorkshopDTO();
            dto.setCategoryId(category.getCategoryId());
            dto.setCategoryName(category.getCategoryName());
            return dto;
        }).collect(Collectors.toList());

        ResponseData responseData = new ResponseData();
        responseData.setStatus(200);
        responseData.setDescription("Success");
        responseData.setData(responseList);
        return responseData;
    }

    @Override
    public ResponseData createCategory(MarketingCampaignsCategoryData categoryData) {
        MarketingCampaignCategory category = new MarketingCampaignCategory();
        category.setCategoryName(categoryData.getCampaignName());

        categoryRepository.save(category);

        ResponseData responseData = new ResponseData();
        responseData.setStatus(201);
        responseData.setDescription("Category created successfully");
        responseData.setData(categoryData);
        return responseData;
    }

    @Override
    public List<MarketingCampaignsResponse> getMarketingCampaignsByInstructors(int instructorId) {
        Users instructor = userRepository.findById(instructorId).orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: " + instructorId));

        List<MarketingCampaigns> campaigns = marketingCampaignsRepository.findByWorkshopMarketingCampaigns_Workshop_Instructor(instructor);

        if (campaigns.isEmpty()) {
            throw new ResourceNotFoundException("No campaigns found for instructor with id: " + instructorId);
        }
        return campaigns.stream().map(this::convertToResponse).toList();
    }

    @Override
    public List<MarketingCampaignsResponse> getMarketingCampaignByMediaId(int mediaId) {
        List<MarketingCampaigns> campaigns = marketingCampaignsRepository.findByWorkshopMarketingCampaigns_Workshop_Media(mediaRepository.findById(mediaId).orElseThrow(() -> new ResourceNotFoundException("Media not found with id: " + mediaId)));
        return campaigns.stream().map(this::convertToResponse).collect(Collectors.toList());
    }


    @Override
    public void updateMarketingCampaignStatus(int marketingCampaignId) {
        MarketingCampaigns campaign = marketingCampaignsRepository.findById(marketingCampaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Marketing campaign not found with id: " + marketingCampaignId));

        if (campaign.getStatus() == MarketingCampaignType.STARTED) {
            campaign.setStatus(MarketingCampaignType.COMPLETED);
        } else {
            campaign.setStatus(MarketingCampaignType.STARTED);
        }
        marketingCampaignsRepository.save(campaign);
    }

    private MarketingCampaignsResponse convertToResponse(MarketingCampaigns campaign) {
        MarketingCampaignsResponse response = new MarketingCampaignsResponse();
        BeanUtils.copyProperties(campaign, response);
        response.setCategoryId(campaign.getMarketingCampaignCategory().getCategoryId());
        response.setCategoryName(campaign.getMarketingCampaignCategory().getCategoryName());
        return response;
    }
} 