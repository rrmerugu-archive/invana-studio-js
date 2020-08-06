function makeRandomId(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getNewData() {
    let nodeTemplate = {
        label: "RandomString",
        metaType: "ellipse",
        metaBgColor: "green",
        metaBgImage: null
    };

    let nodeIds = [makeRandomId(6), makeRandomId(6), makeRandomId(6), makeRandomId(6)];
    console.log("nodeIds", nodeIds);
    let nodes = [];
    nodeIds.forEach(function (nodeId) {
        let _temp = JSON.parse(JSON.stringify(nodeTemplate));
        _temp["id"] = nodeId;
        nodes.push(_temp);
    });

    let edges = [
        {
            id: nodeIds[0] + "-" + nodeIds[1],
            label: "Connection",
            source: nodeIds[0],
            target: nodeIds[1],
            metaBgColor: "red",
            metaLabelColor: "black"
        },
        {
            id: nodeIds[2] + "-" + nodeIds[3],
            label: "Connection",
            source: nodeIds[2],
            target: nodeIds[3],
            metaBgColor: "red",
            metaLabelColor: "black"
        }
    ];
    console.log("new nodes", nodes);
    console.log("new edges", edges);
    return [nodes, edges];
}

