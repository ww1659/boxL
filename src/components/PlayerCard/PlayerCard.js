import React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { startCase, toLower } from "lodash";

const LeftContent = (props) => <Avatar.Icon {...props} icon={props.avatar} />;

const titleCase = (name) => {
  return startCase(toLower(name));
};

const PlayerCard = ({ username, name, avatar }) => {
  return (
    <View style={styles.card}>
      <Card>
        <Card.Title
          title={titleCase(name)}
          subtitle={username}
          left={(props) => <LeftContent {...props} />}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
  },
});

export default PlayerCard;
