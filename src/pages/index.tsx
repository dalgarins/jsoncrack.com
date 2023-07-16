import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { defaultJson } from "src/constants/data";
import { BottomBar } from "src/containers/Editor/BottomBar";
import { Tools } from "src/containers/Editor/LiveEditor/Tools";
import Panes from "src/containers/Editor/Panes";
import { EditorMantine } from "src/layout/EditorMantine";
import { Loading } from "src/layout/Loading";
import useFile from "src/store/useFile";
import useJson from "src/store/useJson";

export const StyledPageWrapper = styled.div`
  height: calc(100vh - 27px);
  width: 100%;

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

export const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const EditorPage: React.FC = () => {
  const { isReady, query } = useRouter();
  const loading = useJson(state => state.loading);
  const setContents = useFile(state => state.setContents);
  const fetchUrl = useFile(state => state.fetchUrl);

  React.useEffect(() => {
    if (isReady) {
      if (typeof query?.url === "string") fetchUrl(query.url);
      if (!query?.url && !query?.json) {
        setContents({ contents: defaultJson, hasChanges: false });
      }
    }
  }, [fetchUrl, isReady, query, setContents]);

  if (loading) return <Loading message="Fetching JSON from cloud..." />;

  return (
    <EditorMantine>
      <StyledEditorWrapper>
        <Head>
          <title>Editor | JSON Crack</title>
          <meta name="description" content="View your JSON data in graphs instantly." />
        </Head>
        <StyledPageWrapper>
          <Tools />
          <StyledEditorWrapper>
            <Panes />
          </StyledEditorWrapper>
        </StyledPageWrapper>
        <BottomBar />
      </StyledEditorWrapper>
    </EditorMantine>
  );
};

export default EditorPage;
