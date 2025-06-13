package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    List<Schedule> findByWorkshops_WorkshopId(int workshopId);

}
