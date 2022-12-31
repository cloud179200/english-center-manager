import { getService } from "../../config/services";

export const getTeacherDashboardDataService = async (body) => {
    try {
        return await getService(
            `/api/dashboard/get-by-teacher-id?p_teacher_id=${body.teacher_Id}`,
            "get data fail",
            true
        );
    } catch (error) {
        throw error;
    }
};

export const getStudentDashboardDataService = async (body) => {
    try {
        return await getService(
            `/api/dashboard/get-by-teacher-id?p_teacher_id=${body.student_Id}`,
            "get data fail",
            true
        );
    } catch (error) {
        throw error;
    }
};

export const getAdminDashboardDataService = async () => {
    try {
        return await getService(
            `/api/dashboard/get-info`,
            "get data fail",
            true
        );
    } catch (error) {
        throw error;
    }
};