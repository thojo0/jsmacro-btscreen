const service = JsMacros.getServiceManager().getServiceData("BTScreen");
service.getObject("log")(`Status: ${service.getString("status")}`);
