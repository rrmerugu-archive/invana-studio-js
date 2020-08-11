import GEActions from "./actions";

const actions = new GEActions();

export default class GEEvents {

    OnTap(event, cy) {
        // console.info("onTap event triggered");
        if (event.target === cy) {
            // console.info('tap on background');
            return null;
        } else {
            const node = event.target;
            console.log('tapped ' + node.id());
            console.log('tap on some element');
            return node;
        }

    }


    onTagDrag(event, cy) {
        // console.info("dragStarted event triggered");
        if (event.target === cy) {
            // console.info('dragStarted on background ignored');
        } else {
            actions.highLightNeighbourNodes(event.target, cy);
            // actions.unLockNeighbors(event.target);
        }
    }

    onTapStart(event, cy) {
        // console.info("onTapStart event triggered");
        if (event.target === cy) {
            // console.info('dragStarted on background ignored');
        } else {
            actions.unLockNeighbors(event.target);
            actions.highLightNeighbourNodes(event.target, cy);
            // actions.unLockNeighbors(event.target);
        }
    }

    onTapEnded(event, cy) {
        if (event.target === cy) {
            // console.info('dragEnded on background ignored');
        } else {
            actions.unHighLightNeighbourNodes(event.target, cy);
        }
    }

    onTapDragOut(event, cy) {
        if (event.target === cy) {
            // console.info('dragEnded on background ignored');
        } else {
            actions.unHighLightNeighbourNodes(event.target, cy);
        }
    }

    onSelect(event, cy) {
        if (event.target === cy) {
            // console.info('dragEnded on background ignored');
            return null;
        } else {
            return event.target;
        }
    }


}
