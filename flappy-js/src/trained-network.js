const TRAINED_NETWORK_JSON="{\"nodes\":[{\"bias\":0.053913310410845655,\"type\":\"input\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":0},{\"bias\":0.04697119583817694,\"type\":\"input\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":1},{\"bias\":0.0645278050251461,\"type\":\"input\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":2},{\"bias\":0.8296756656071915,\"type\":\"hidden\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":3},{\"bias\":-0.15151570625988464,\"type\":\"hidden\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":4},{\"bias\":2.320295321643311,\"type\":\"hidden\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":5},{\"bias\":-1.061805672835963,\"type\":\"hidden\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":6},{\"bias\":-0.9708980916456804,\"type\":\"output\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":7},{\"bias\":1.091154727262572,\"type\":\"output\",\"squash\":\"LOGISTIC\",\"mask\":1,\"index\":8}],\"connections\":[{\"weight\":0.7484767724005057,\"from\":0,\"to\":3,\"gater\":null},{\"weight\":-0.4113704134332441,\"from\":0,\"to\":4,\"gater\":null},{\"weight\":-1.4593033144124583,\"from\":0,\"to\":5,\"gater\":null},{\"weight\":2.0078902024034258,\"from\":0,\"to\":6,\"gater\":null},{\"weight\":-0.09597989776622606,\"from\":1,\"to\":3,\"gater\":null},{\"weight\":-1.3016478197340566,\"from\":1,\"to\":4,\"gater\":null},{\"weight\":-1.156062957311617,\"from\":1,\"to\":5,\"gater\":null},{\"weight\":0.47416831220114686,\"from\":1,\"to\":6,\"gater\":null},{\"weight\":2.5389153939550333,\"from\":2,\"to\":3,\"gater\":null},{\"weight\":-0.0669516528127867,\"from\":2,\"to\":4,\"gater\":null},{\"weight\":-0.4973898933716675,\"from\":2,\"to\":5,\"gater\":null},{\"weight\":0.04142155008272275,\"from\":2,\"to\":6,\"gater\":null},{\"weight\":-0.48111042601693843,\"from\":3,\"to\":8,\"gater\":null},{\"weight\":-0.21347439242717167,\"from\":3,\"to\":7,\"gater\":null},{\"weight\":-3.022134100054317,\"from\":4,\"to\":8,\"gater\":null},{\"weight\":0.4584363177141568,\"from\":4,\"to\":7,\"gater\":null},{\"weight\":-0.5130911290690551,\"from\":5,\"to\":8,\"gater\":null},{\"weight\":-0.7753092377003454,\"from\":5,\"to\":7,\"gater\":null},{\"weight\":-2.789676219308474,\"from\":6,\"to\":8,\"gater\":null},{\"weight\":-1.0451717285858293,\"from\":6,\"to\":7,\"gater\":null}],\"input\":3,\"output\":2,\"dropout\":0}";

function generateTrainedBrain(){
    return neataptic.Network.fromJSON(JSON.parse(TRAINED_NETWORK_JSON));

}