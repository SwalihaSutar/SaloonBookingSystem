package com.salonbooking.dto;

public class BookingRequest {
	 private Long salonId;
	    private String date;
	    private String time;
	    private String service;
	    private String status;     // e.g. Pending, Confirmed
	    private String dateTime; 
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getDateTime() {
			return dateTime;
		}
		public void setDateTime(String dateTime) {
			this.dateTime = dateTime;
		}
		public Long getSalonId() {
			return salonId;
		}
		public void setSalonId(Long salonId) {
			this.salonId = salonId;
		}
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getTime() {
			return time;
		}
		public void setTime(String time) {
			this.time = time;
		}
		public String getService() {
			return service;
		}
		public void setService(String service) {
			this.service = service;
		}

}
