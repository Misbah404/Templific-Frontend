import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Colors } from "../../theme";
import { useLocation, useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  GET_GROUP_DEMO_TEMPLATES,
  GET_GROUP_TRANSACTION_TEMPLATES,
} from "../../graphQueries";
import { connect, useDispatch } from "react-redux";
import {
  setDemoGroupTemplates,
  setTransactionGroupTemplates,
} from "../../actions/CanvasDataAction";
import { ROUTES } from "../../constants";
import _ from "lodash";

const LoadGroupTemplates = (props) => {
  const { demoGroupTemplates, transactionGroupTemplates } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()?.pathname?.split("/");
  const isDemo = location[location.length - 2] !== "transaction" ? true : false;
  const templateId = location[location.length - 1];

  const [getGroupTemplates] = useLazyQuery(GET_GROUP_DEMO_TEMPLATES, {
    onCompleted(data) {
      let groupTemplates = {};
      const allTemplates = data?.groupTemplates?.data;

      allTemplates?.map((grpTemplate) => {
        let templates = {};

        const allGrpTemplates = grpTemplate?.attributes?.templates?.data;
        allGrpTemplates.map((template) => {
          templates[`${template.attributes.name}_${template.id}`] = {
            name: template?.attributes?.name,
            height: template?.attributes?.height,
            width: template?.attributes?.width,
            template: template?.attributes?.template,
            unit: template?.attributes?.unit,
            zoomValue: template?.attributes?.zoomValue,
            canvasAttrs: template?.attributes?.canvasAttrs,
            demoId: template?.attributes?.demoId,
            transactionId: template?.attributes?.transactionId,
            id: template?.id,
            category: {
              name: template?.attributes?.category?.data?.attributes?.name,
              id: template?.attributes?.category?.data?.id,
            },
            image: {
              name: template?.attributes?.image?.data?.attributes?.name,
              url: template?.attributes?.image?.data?.attributes?.url,
              height: template?.attributes?.image?.data?.attributes?.height,
              width: template?.attributes?.image?.data?.attributes?.width,
              id: template?.attributes?.image?.data?.id,
            },
          };
        });

        groupTemplates = {
          ...groupTemplates,
          [`group-${grpTemplate.id}`]: {
            id: grpTemplate.id,
            demoLink: grpTemplate.attributes?.demoLink,
            name: grpTemplate.attributes?.name,
            templates: { ...templates },
          },
        };
      });

      if (isDemo) {
        dispatch(setDemoGroupTemplates(groupTemplates));
      }
    },
    onError(err) {
      console.error({ err });
    },
  });

  // alert("hell world")

  const [getGroupTransactionTemplates] = useLazyQuery(
    GET_GROUP_TRANSACTION_TEMPLATES,
    {
      onCompleted(data) {
        let groupTemplates = {};
        const allTemplates = data?.groupTemplates?.data;

        allTemplates?.map((grpTemplate) => {
          let templates = {};

          const allGrpTemplates = grpTemplate?.attributes?.templates?.data;
          allGrpTemplates.map((template) => {
            templates[`${template.attributes.name}_${template.id}`] = {
              name: template?.attributes?.name,
              height: template?.attributes?.height,
              width: template?.attributes?.width,
              template: template?.attributes?.template,
              unit: template?.attributes?.unit,
              zoomValue: template?.attributes?.zoomValue,
              canvasAttrs: template?.attributes?.canvasAttrs,
              demoId: template?.attributes?.demoId,
              transactionId: template?.attributes?.transactionId,
              id: template?.id,
              category: {
                name: template?.attributes?.category?.data?.attributes?.name,
                id: template?.attributes?.category?.data?.id,
              },
              image: {
                name: template?.attributes?.image?.data?.attributes?.name,
                url: template?.attributes?.image?.data?.attributes?.url,
                height: template?.attributes?.image?.data?.attributes?.height,
                width: template?.attributes?.image?.data?.attributes?.width,
                id: template?.attributes?.image?.data?.id,
              },
            };
          });

          groupTemplates = {
            ...groupTemplates,
            [`group-${grpTemplate.id}`]: {
              id: grpTemplate.id,
              demoLink: grpTemplate.attributes?.demoLink,
              name: grpTemplate.attributes?.name,
              templates: { ...templates },
            },
          };
        });

        if (isDemo) {
          dispatch(setDemoGroupTemplates(groupTemplates));
        } else {
          dispatch(setTransactionGroupTemplates(groupTemplates));
        }
      },
      onError(err) {
        console.error({ err });
      },
    }
  );

  useEffect(() => {
    if (isDemo) {
      getGroupTemplates({ variables: { demoLink: templateId } });
    } else {
      getGroupTransactionTemplates({
        variables: { transactionLink: templateId },
      });
    }
  }, [templateId]);

  useEffect(() => {
    if (isDemo) {
      if (
        !_.isEmpty(demoGroupTemplates) &&
        Object.keys(demoGroupTemplates).length === 1
      ) {
        const groupData =
          demoGroupTemplates[Object.keys(demoGroupTemplates)[0]];

        const template =
          groupData.templates[Object.keys(groupData.templates)[0]];
        if (!_.isEmpty(template)) {
          history.push(ROUTES.TEMPLATE_DEMO.split(":")[0] + template.demoId);
        }
      }
    } else {
      if (
        !_.isEmpty(transactionGroupTemplates) &&
        Object.keys(transactionGroupTemplates).length === 1
      ) {
        const groupData =
          transactionGroupTemplates[Object.keys(transactionGroupTemplates)[0]];

        const template =
          groupData.templates[Object.keys(groupData.templates)[0]];
        if (!_.isEmpty(template)) {
          history.push(
            ROUTES.TEMPLATE_TRANSACTION.split(":")[0] + template.transactionId
          );
        }
      }
    }
  }, [isDemo, demoGroupTemplates, transactionGroupTemplates]);

  return (
    <div className='loader-wrapper'>
      <BarLoader sizeUnit={"px"} size={150} color={Colors.kgGreen} />
    </div>
  );
};

const mapStateToProps = ({ canvasData }) => ({
  demoGroupTemplates: canvasData.demoGroupTemplates,
  transactionGroupTemplates: canvasData.transactionGroupTemplates,
});

export default connect(mapStateToProps)(LoadGroupTemplates);
