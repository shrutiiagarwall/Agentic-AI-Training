import os
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv
from google import genai
from google.genai import types


# =========================================================
# CONFIG
# =========================================================

# Load .env file from the same folder as this Python file
env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    st.error("❌ GEMINI_API_KEY not found in .env file.")
    st.stop()


client = genai.Client(
    api_key=api_key
)


# =========================================================
# STREAMLIT PAGE
# =========================================================

st.set_page_config(
    page_title="Gemini Tool Assistant",
    page_icon="🤖",
    layout="centered"
)


st.title("🤖 Gemini Tool Assistant")

st.caption(
    "Gemini 2.5 Flash + Python Function Calling"
)


# =========================================================
# TOOLS
# =========================================================

def add(a, b):

    print(f"\n🔧 TOOL CALLED: add({a}, {b})")

    result = a + b

    print(f"✅ add() RESULT: {result}")

    return result


def product(a, b):

    print(f"\n🔧 TOOL CALLED: product({a}, {b})")

    result = a * b

    print(f"✅ product() RESULT: {result}")

    return result


# =========================================================
# GEMINI TOOL DEFINITIONS
# =========================================================

tools = types.Tool(
    function_declarations=[

        # ---------------- ADD ----------------

        types.FunctionDeclaration(
            name="add",
            description="Add two numbers together.",
            parameters={
                "type": "OBJECT",
                "properties": {
                    "a": {
                        "type": "NUMBER",
                        "description": "First number"
                    },
                    "b": {
                        "type": "NUMBER",
                        "description": "Second number"
                    }
                },
                "required": ["a", "b"]
            }
        ),

        # ---------------- PRODUCT ----------------

        types.FunctionDeclaration(
            name="product",
            description="Multiply two numbers together.",
            parameters={
                "type": "OBJECT",
                "properties": {
                    "a": {
                        "type": "NUMBER",
                        "description": "First number"
                    },
                    "b": {
                        "type": "NUMBER",
                        "description": "Second number"
                    }
                },
                "required": ["a", "b"]
            }
        )
    ]
)


# =========================================================
# CHAT HISTORY
# =========================================================

if "messages" not in st.session_state:

    st.session_state.messages = []


# =========================================================
# DISPLAY CHAT HISTORY
# =========================================================

for message in st.session_state.messages:

    with st.chat_message(message["role"]):

        st.markdown(message["content"])


# =========================================================
# USER INPUT
# =========================================================

query = st.chat_input(
    "Ask something..."
)


if query:

    # -----------------------------------------------------
    # Show user message
    # -----------------------------------------------------

    st.session_state.messages.append({
        "role": "user",
        "content": query
    })

    with st.chat_message("user"):
        st.markdown(query)


    # -----------------------------------------------------
    # First Gemini request
    # -----------------------------------------------------

    response = client.models.generate_content(

        model="gemini-2.5-flash",

        contents=query,

        config=types.GenerateContentConfig(
            tools=[tools]
        )
    )


    # =====================================================
    # TOOL CALLING LOOP
    # =====================================================

    while True:

        function_call = None

        # -------------------------------------------------
        # Check whether Gemini wants to call a tool
        # -------------------------------------------------

        for part in response.candidates[0].content.parts:

            if part.function_call:

                function_call = part.function_call

                break


        # -------------------------------------------------
        # No tool required
        # -------------------------------------------------

        if not function_call:

            break


        # -------------------------------------------------
        # Get tool information
        # -------------------------------------------------

        name = function_call.name

        args = function_call.args


        # -------------------------------------------------
        # Show tool call in browser
        # -------------------------------------------------

        with st.chat_message("assistant"):

            st.info(
                f"🔧 **Tool Called:** `{name}`\n\n"
                f"**Arguments:** `{dict(args)}`"
            )


        # =================================================
        # EXECUTE TOOL
        # =================================================

        if name == "add":

            result = add(
                args["a"],
                args["b"]
            )


        elif name == "product":

            result = product(
                args["a"],
                args["b"]
            )


        else:

            result = "Unknown tool"


        # -------------------------------------------------
        # Show result in browser
        # -------------------------------------------------

        with st.chat_message("assistant"):

            st.success(
                f"✅ **Tool Result:** `{result}`"
            )


        # =================================================
        # SEND TOOL RESULT BACK TO GEMINI
        # =================================================

        response = client.models.generate_content(

            model="gemini-2.5-flash",

            contents=[

                # Original user question
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(
                            text=query
                        )
                    ]
                ),

                # Gemini's previous response
                response.candidates[0].content,

                # Tool result
                types.Content(
                    role="tool",
                    parts=[
                        types.Part.from_function_response(
                            name=name,
                            response={
                                "result": result
                            }
                        )
                    ]
                )
            ],

            config=types.GenerateContentConfig(
                tools=[tools]
            )
        )


    # =====================================================
    # FINAL GEMINI RESPONSE
    # =====================================================

    answer = response.text


    with st.chat_message("assistant"):

        st.markdown(answer)


    # Save assistant response

    st.session_state.messages.append({
        "role": "assistant",
        "content": answer
    })