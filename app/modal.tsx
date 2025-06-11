import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Thread {
  id: string;
  text: string;
  hashtag?: string;
  location?: [number, number];
  imageUrls: string[];
}

export function ListFooter({
  canAddThread,
  addThread,
}: {
  canAddThread: boolean;
  addThread: () => void;
}) {
  console.log("뚜레두를 add할 수 있는건가유?", canAddThread);
  return (
    <View style={styles.listFooter}>
      <View style={styles.listFooterAvatar}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatarSmall}
        />
      </View>
      <View>
        <Pressable onPress={addThread} style={[styles.input]}>
          <Text style={{ color: canAddThread ? "#999" : "#aaa" }}>
            Add to thread
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Modal() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([
    { id: Date.now().toString(), text: "", imageUrls: [] },
  ]);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const replyOptions = ["Anyone", "Profiles you follow", "Mentioned only"];
  const colorScheme = useColorScheme();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const handleCancel = () => {};
  const handlePost = () => {};
  const deleteThread = (id: string) => {
    console.log("선택한 아이디 입니다앙", id, "Array입니다앙아", threads);

    // 해당 id에 관한 thread array에서 삭제하여 filtering한다
    const result = threads.filter((thread) => thread.id !== id);
    setThreads(result);
  };

  const updateThreadText = (id: string, newText: string) => {
    setThreads((prevThread) =>
      prevThread.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              text: newText,
            }
          : thread
      )
    );
  };
  const getMyLocation = async (id: string) => {
    // ForeGroundLocation 권한 받기
    let { status } = await Location.requestForegroundPermissionsAsync();
    // BackgroundLocation 권한 받기
    //   Location.requestBackgroundPermissionsAsync
    if (status !== "granted") {
      try {
        await Location.getForegroundPermissionsAsync();
      } catch (error) {
        console.error(error);
        await Linking.openSettings();
        Alert.alert(
          "Location Permission not granted",
          "Please grant locatin permission to",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: "Cancel",
            },
          ]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === id
            ? {
                ...thread,
                location: [location.coords.latitude, location.coords.longitude],
              }
            : thread
        )
      );

      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const canAddThread = (threads.at(-1)?.text.trim().length ?? 0) > 0; // post의 마지막 글의 length를 return한다
  const renderThreadItem = ({
    item,
    index,
  }: {
    item: Thread;
    index: number;
  }) => {
    return (
      <View style={styles.threadContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.threadLine} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.userInfoContainer}>
            <Text
              style={[
                styles.username,
                // colorScheme === "dark"
                //   ? styles.usernameDark
                //   : styles.usernameLight,
              ]}
            >
              YUNAJOEY
            </Text>
            {index > 0 && (
              <TouchableOpacity
                onPress={() => deleteThread(item.id)}
                style={styles.removeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-outline" size={20} color="#cc0404" />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              // colorScheme === "dark" ? styles.inputDark : styles.inputLight,
            ]}
            placeholder={"What's new?"}
            placeholderTextColor="#999"
            value={item.text}
            onChangeText={(text) => updateThreadText(item.id, text)}
            multiline
          />
          {item.imageUrls && item.imageUrls.length > 0 && (
            <FlatList
              data={item.imageUrls}
              renderItem={({ item: uri, index: imgIndex }) => (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    onPress={
                      () => {}
                      // !isPosting && removeImageFromThread(item.id, uri)
                    }
                    style={styles.removeImageButton}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color="rgba(0,0,0,0.7)"
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(uri, imgIndex) =>
                `${item.id}-img-${imgIndex}-${uri}`
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageFlatList}
            />
          )}

          {/* 아이템 로케이션 있을때 */}
          {item.location && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                {item.location[0]}, {item.location[1]}
              </Text>
            </View>
          )}
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton} onPress={() => {}}>
              <Ionicons name="image-outline" size={24} color="#777" />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => {}}>
              <Ionicons name="camera-outline" size={24} color="#777" />
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                // getMyLocation(item.id);
              }}
            >
              <FontAwesome name="map-marker" size={24} color="#777" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel}>
          <Text style={[styles.cancel]}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>New thread</Text>
        <View style={styles.headerRightPlaceholder}></View>
      </View>

      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        style={[
          styles.list,
          // colorScheme === "dark" ? styles.listDark : styles.listLight,
        ]}
        renderItem={renderThreadItem}
        ListFooterComponent={
          <ListFooter
            canAddThread={canAddThread}
            addThread={() => {
              if (canAddThread) {
                setThreads((prevThreads) => [
                  ...prevThreads,
                  { id: Date.now().toString(), text: "", imageUrls: [] },
                ]);
              }
            }}
          ></ListFooter>
        }
        contentContainerStyle={{ backgroundColor: "#ddd" }}
        keyboardShouldPersistTaps="handled"
      ></FlatList>

      {/* footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable onPress={() => setIsDropdownVisible(true)}>
          <Text style={[styles.footerText]}>
            {replyOptions}can reply & quote
          </Text>
        </Pressable>
        <Pressable
          style={[styles.postButton, styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={isPosting}
        >
          <Text style={[styles.cancel]}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Modal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerRightPlaceholder: {
    width: 60,
  },
  cancel: {
    color: "#000",
    fontSize: 16,
  },
  disabledText: {
    color: "#ccc",
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    flex: 1,
    backgroundColor: "#eee",
  },
  threadContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#555",
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#555",
  },
  threadLine: {
    width: 1.5,
    flexGrow: 1,
    backgroundColor: "#aaa",
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 6,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
  },
  input: {
    fontSize: 15,
    color: "#000",
    paddingTop: 4,
    paddingBottom: 8,
    minHeight: 24,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 15,
  },
  imageFlatList: {
    marginTop: 12,
    marginBottom: 4,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  listLight: {
    backgroundColor: "white",
  },
  listDark: {
    backgroundColor: "#101010",
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#000",
    borderRadius: 18,
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  dropdownOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  selectedOption: {},
  dropdownOptionText: {
    fontSize: 16,
    color: "#000",
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  removeButton: {
    padding: 4,
    marginRight: -4,
    marginLeft: 8,
  },
  listFooter: {
    paddingLeft: 26,
    paddingTop: 10,
    flexDirection: "row",
  },
  listFooterAvatar: {
    marginRight: 20,
    paddingTop: 2,
  },
  locationContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#8e8e93",
  },
});
