const ScheduleSchema = require("../schemas/ScheduleSchema");
const User = require("../schemas/UserSchema");
const {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
  formatPhone,
  mapAsFilters,
} = require("./imports");

const Controllers = function () {
  return {
    async addSchedule(req, res, next) {
      try {
        const { title, dueDate, type } = req.body;

        const newSchedule = new ScheduleSchema(title, dueDate, type);
        let response = await dataSource.createSchedule(newSchedule);
        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while creating schedule"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },

    async getSingleSchedule(req, res, next) {
      try {
        const { eventId } = req.params;
        const schedule = await dataSource.fetchOneSchedule(eventId);
        if (!schedule) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Schedule not found"
          );
        }

        const payload = schedule;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Schedule found successfully",
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },

    async getAllSchedules(req, res, next) {
      try {
        const filters = mapAsFilters({ ...req.query });
        const schedules = await dataSource.fetchAllSchedules(filters);

        if (!schedules) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No schedules found"
          );
        }

        const { rows, count } = schedules;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Found Successfully",
          totalCount: count,
          payload: rows,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
