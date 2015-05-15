ServiceConfiguration.configurations.upsert(
	{ service: "todoistv6" },
  	{
    	$set: {
      		client_id: 		"57d0c067f7974a70b0fe4440c7e10754",
      		client_secret: 	"253ee79b6f6b44bcb8300316293e1a84",
      		scope: 			"data:read",
      		loginStyle: 	"popup"       		
    	}
  	}
);