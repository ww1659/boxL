import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { startCase } from "lodash";
import { fetchClubsById } from "../../utils/api";
import { TouchableOpacity } from "react-native";
import { formatDateLong } from "../../utils/formatDate";

const LeftContent = (props) => <Avatar.Icon {...props} icon="trophy" />;

const changeFormat = (format) => {
  return startCase(format.split("_").join(" "));
};

const LeagueCard = ({
  leagueId,
  leagueName,
  clubId,
  startDate,
  endDate,
  format,
  onPress,
}) => {
  const [clubName, setClubName] = useState("");
  const [clubImage, setClubImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubsById(clubId)
      .then((club) => {
        setClubName(club[0].name);
        setClubImage(club[0].image_url);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Card.Title
              title={leagueName}
              subtitle={clubName}
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="bodyMedium">
                End Date: {formatDateLong(endDate)}
              </Text>
              <Text variant="bodyMedium">Format: {changeFormat(format)}</Text>
            </Card.Content>
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default LeagueCard;
