const fabric = {
	"styles": [],
	"forms": [],
	"templates": [
        {
            "id": "footer"
        }
    ],
	"pages": [
        {
            "id": "page_home",
            "title": "Home Page",
            "layout": [
                {
                    "row": 
                        [
                            {"": "NOTE: This needs more thought. Could either be declarative (like shown here)."},
                            {".": "NOTE: Could also use references to another JSON blob. Eventually DB persisted."},
                            {"h1": "This is the Home Page."},
                            {"p": "Lorem ipsum paragraph one."},
                            {"p": "Booya Shocka paragraph two."},
                        ],
                    "row":
                        [
                            {"column": 
                                [
                                    {"h2": "Middle row text 1."}
                                ]
                            }
                        ]
                },
                {

                }
            ]
		},
	  	{
            "id": "page_textBoxControl",
            "title": "Text Box Control"
		}
	]
}