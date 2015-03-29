//
//  VideoContentModes.m
//  FacebookLogin
//
//  Created by Brent Vatne on 2015-03-29.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "VideoContentModes.h"
@import MediaPlayer;

@implementation VideoContentModes

- (NSDictionary *)constantsToExport
{
    return @{@"ScaleNone": @(MPMovieScalingModeNone),
             @"ScaleToFill": @(MPMovieScalingModeFill),
             @"ScaleAspectFit": @(MPMovieScalingModeAspectFit),
             @"ScaleAspectFill": @(MPMovieScalingModeAspectFill)};
}

@end