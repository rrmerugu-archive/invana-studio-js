

export default class GEEvents {

    constructor(props) {
        this.props = props;
    }

    static defaultProps = {
        controller: null,
        updateState: null
    }

    OnTap(event) {
        // console.info("onTap event triggered");
        const cy = this.props.controller.getCy();
        const element = event.target === cy ? null : event.target
        if (element) {
            this.props.controller.highLightNeighbourNodes(element);
        }
    }


    onTagDrag(event) {
        // console.info("dragStarted event triggered");
        const cy = this.props.controller.getCy();
        const element = event.target === cy ? null : event.target
        if (element) {
            this.props.controller.highLightNeighbourNodes(event.target);
        }

    }

    onTapStart(event) {
        // console.info("onTapStart event triggered");
        if (event.target === this.props.controller.getCy()) {
            // console.info('dragStarted on background ignored');
        } else {
            this.props.controller.unLockNeighbors(event.target);
            this.props.controller.highLightNeighbourNodes(event.target);
            this.props.updateState({selectedElement: event.target});

        }
    }

    onTapEnded(event) {
        if (event.target === this.props.controller.getCy()) {
            // console.info('dragEnded on background ignored');
        } else {
            this.props.controller.unHighLightNeighbourNodes(event.target, this.props.controller.getCy());
        }
    }

    onTapDragOut(event) {
        if (event.target === this.props.controller.getCy()) {
            // console.info('dragEnded on background ignored');
        } else {
            this.props.controller.unHighLightNeighbourNodes(event.target, this.props.controller.getCy());
        }
        this.props.updateState({selectedElement: null});

    }

    onElementSelect(event) {
        if (event.target === this.props.controller.getCy()) {
            // console.info('dragEnded on background ignored');
            return null;
        } else {
            return event.target;
        }
    }


}
